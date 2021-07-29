package DB;

import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Timer;

import Match.GenScores;
import Match.MyServlet;
import Match.MyTimerTask;

public class DataBase {

    /**
     *
     */
    private static final String Path = "jdbc:postgresql://localhost:5432/cricket";

    private static final String TEAMB = "teamb";

    private static final String TEAMA = "teama";

    public static Connection createconnection() {
        Connection c = null;
        PrintStream out = System.out;
        try {
            c = DriverManager.getConnection(Path, "postgres", "123");
            out.println("Opened database successfully");
            return c;
        } catch (Exception e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
        return createconnection();
    }

    // a private variable connection to be used within this class
    private static Connection connection = createconnection();

    // create a method to return the names of teama and teamb from the matches table
    // using the primary key id
    public static String[] getTeamNames(String id) {
        String[] teamNames = new String[2];
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT teama, teamb FROM matches WHERE id = " + id);
            while (rs.next()) {
                teamNames[0] = rs.getString(TEAMA);
                teamNames[1] = rs.getString(TEAMB);
            }
            rs.close();
        } catch (SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
        return teamNames;
    }

    // create a method to create a table in the name "matche_"+id
    // and store the details of the match in it
    public static void createTable(String id) {
        try (Statement stmt = connection.createStatement()) {

            // create a table named match_+id to store score, status, target player
            stmt.executeUpdate("CREATE TABLE match_" + id + " (score integer, status text, target text, player text)");
        } catch (SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            MyServlet.mymsg = "creating table";
        }
        MyServlet.mymsg = "table created successfully";
    }

    // create a method to store the run to the table "match_"+id
    public static void storeRun(String id, int score, String status) {
        try (Statement stmt = connection.createStatement()) {
            // find the sum of scores in the table match_id where status == status
            int target = findTeamScore(id, status);
            // insert the score, status, text and player as MSD to the match_id table
            stmt.executeUpdate("INSERT INTO match_" + id + " VALUES (" + score + ", '" + status + "', '" + target
                    + "', '" + "MSD" + "')");
        } catch (SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            storeRun(id, score, status);
        }
    }

    public static int findTeamScore(String id, String status) {
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT SUM(score) FROM match_" + id + " WHERE status = '" + status + "'");
            int target = 0;
            while (rs.next()) {
                target = rs.getInt(1);
            }
            rs.close();
            return target;
        } catch (SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            return findTeamScore(id, status);
        }
    }

    // create a method called getschedule to return a schedule
    public static String getSchedule() {
        StringBuilder result = new StringBuilder();
        String resultString = "";
        try (Statement stmt = connection.createStatement()) {
            // read everything from the matches table in the descending order
            ResultSet rs = stmt.executeQuery("SELECT * FROM matches ORDER BY id DESC");
            result.append("{\"data\": [");
            while (rs.next()) {
                // read string values teama, teamb, date and time from rs and store as a json
                String teama = rs.getString(TEAMA);
                String teamb = rs.getString(TEAMB);
                String date = rs.getString("date");
                String time = rs.getString("time");
                int id = rs.getInt("id");
                // convert id from int to string
                String idString = Integer.toString(id);
                result.append("{\"id\":\"" + idString + "\",\"teamA\": \"" + teama + "\", \"teamB\": \"" + teamb
                        + "\", \"date\": \"" + date + "\", \"time\": \"" + time + "\"},");
            }
            rs.close();
            // convert result to string
            resultString = result.toString();
            // remove the last char of result
            resultString = removeComa(resultString);
            resultString += "]}";
        } catch (SQLException e) {
            result.append(e.getClass().getName() + ": " + e.getMessage());
        }

        // return the string of result
        return resultString;
    }

    public static void main(String[] args) {
        // print getRuns(6)
        System.out.println(getRuns("6"));
    }

    public static void storeMatch(String teamA, String teamB, String date, String time, String overs, long timediff) {
        try (Statement stmt = connection.createStatement()) {

            // store the match in the table
            String sql = "insert into matches(id,teamA,teamB,date,time,overs) " + "values(nextval('serial'),'" + teamA
                    + "','" + teamB + "','" + date + "','" + time + "','" + overs + "')";
            stmt.executeUpdate(sql);
            // find the id of the last match
            ResultSet rs = stmt.executeQuery("SELECT id FROM matches ORDER BY id DESC LIMIT 1");
            int id = 0;
            while (rs.next()) {
                id = rs.getInt("id");
            }
            rs.close();
            // convert id from int to string
            String idString = Integer.toString(id);
            // GenScores.startMatch(teamA, teamB, overs, idString, timediff);
            // TODO: call the timer task
            // create an object to the MyTimerTask class with the constructor teamA, teamB,
            // overs, idString, timediff
            // call the run method of the object
            Timer timer = new Timer();
            timer.schedule(new MyTimerTask(teamA, teamB, overs, idString), timediff);

        } catch (Exception e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            storeMatch(teamA, teamB, date, time, overs, timediff);
        }
    }

    // create a boolean method to check if the table "match_"+id exists
    public static boolean checkTable(String id) {
        boolean result = false;
        try (Statement stmt = connection.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT * FROM match_" + id);
            if (rs.next()) {
                result = true;
            }
            rs.close();
        } catch (SQLException e) {
            MyServlet.mymsg += e.getClass().getName() + ": " + e.getMessage();
        }
        return result;
    }

    // create a method to fetch the total runs from the match and return as a json
    // object
    public static String getRuns(String id) {
        String result = "{";

        // if checktable for the id returns false write a mssg as "Match not Started" as
        // a json to the result
        if (!checkTable(id)) {
            result += "\"Started\": \"false\",";
        } else
            result += "\"Started\": \"true\",";

        try (Statement stmt = connection.createStatement()) {
            // create a json array object called scores within result
            String scores1 = "\"scores1\": [";
            String scores2 = "\"scores2\": [";
            String status = "";
            String target = "";
            ResultSet rs = stmt.executeQuery("SELECT score,status,target FROM match_" + id);
            while (rs.next()) {
                // add the result to the scores array
                status = "\"status\":\"" + rs.getString("status") + "\",";
                // if status == '1' then add to scores1 or add to scores2
                if (rs.getString("status").equals("1"))
                    scores1 += rs.getString("score") + ",";
                else
                    scores2 += rs.getString("score") + ",";
                target = "\"target\":\"" + rs.getString("target") + "\",";
            }
            rs.close();
            scores1 = removeComa(scores1);
            scores2 = removeComa(scores2);
            // add the closing brackets to scores1 and scores2
            scores1 += "],";
            scores2 += "],";
            result += status + target + scores1 + scores2;
        } catch (SQLException e) {
            result = e.getClass().getName() + ": " + e.getMessage();
            result += "<h1>" + id + "</h1>";
            // getRuns(id);
        }
        result = removeComa(result);
        result += "}";
        return result;
    }

    private static String removeComa(String scores2) {
        if (scores2.charAt(scores2.length() - 1) == ',')
            scores2 = scores2.substring(0, scores2.length() - 1);
        return scores2;
    }
}