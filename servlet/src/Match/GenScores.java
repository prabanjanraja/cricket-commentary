package Match;

import java.util.Random;

import DB.DataBase;

public class GenScores extends Thread {
    int over;
    // an integer varible that holds the reamining wickets
    int wickets = 10;
    int ball = 0;
    // a integer variable to store target
    int target;
    // a integer variable to store the total score
    int score = 0;
    // string variables to store the names of teamA and teamB
    String teamA;
    String teamB;
    String id;
    int innings = 1;
    String status = "1";

    // override the run() method
    @Override
    public void run() {
        startinnings();
        target = DataBase.findTeamScore(id, "1");
        ball = 0;
        wickets = 10;
        score = 0;
        MyServlet.mymsg = String.valueOf(target) + status;
        startinnings();
    }

    private void startinnings() {
        int run;
        while (ball < (over * 6) && wickets > 0 && target > score) {
            run = score();
            if (run == -1)
                wickets -= 1;
            else if (score != -1)
                score += run;
            DataBase.storeRun(id, run, status);
            sleep(8000);
        }
        innings += 1;
        status = String.valueOf(innings);
    }

    public static void sleep(long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            MyServlet.mymsg = "Error in sleep()";
        }
    }

    Random rand = new Random();

    private int score() {
        // increment the ball
        ball++;
        int run = this.rand.nextInt(100);
        // a condition to add out
        if (run % 13 == 0)
            return -1;
        // modulo 7 so the score will be in the range of 0 to 6
        return run % 7;
    }

    // create a method called start
    public static void startMatch(String teamA, String teamB, String overs, String id) {
        MyServlet.mymsg = "Starting match between " + teamA + " and " + teamB;
        GenScores genScores = new GenScores();
        // if the time has already elapsed start the match now
        // if (time > 0)
        // sleep(time);
        genScores.id = id;
        genScores.teamA = teamA;
        genScores.teamB = teamB;
        genScores.ball = 0;
        genScores.target = 3000;
        genScores.over = Integer.parseInt(overs);
        if (DataBase.checkTable(id))
            return;
        DataBase.createTable(id);
        genScores.start();
        // Timer.schedule(genScores.start(), time);

    }

    public static void main(String[] args) {
        startMatch("India", "Pakistan", "6", "1");
    }
}
