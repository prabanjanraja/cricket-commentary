package Match;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MyServlet extends HttpServlet {

    public static String mymsg;

    @Override
    public void init() {
        MyServlet.mymsg = "Will you accomplish ?";
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Setting up the content type of webpage
        response.setContentType("text/html");

        // Writing message to the web page
        PrintWriter out = response.getWriter();
        out.println("<h1>" + mymsg + "</h1>");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // read teamA, teamB, date, and time from request
        String teamA = request.getParameter("teama");
        String teamB = request.getParameter("teamb");
        String date = request.getParameter("date");
        String time = request.getParameter("time");
        String overs = request.getParameter("overs");

        // add ":00" to time
        if (time.length() == 5) {
            time += ":00";
        }

        // Convert matchdate from string to java time format
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d;
        try {
            d = dateFormat.parse(date + " " + time);
        } catch (ParseException e) {
            // print the error message to the response using out
            PrintWriter out = response.getWriter();
            out.println("<h1>Error: " + e.getMessage() + "</h1>");
            out.println(e.getMessage());
            return;
        }
        // convert matchtime to string
        String matchtimeStr = d.toString();

        // find the current system time
        Date now = new Date();
        String nowStr = now.toString();

        // find the difference between now and d
        long diffMilli = d.getTime() - now.getTime();

        // convert diff to string
        String diffStr = String.valueOf(diffMilli);

        // return the teamA, teamB, date, and time to the webpage using the response
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println(
                "<h1>" + teamA + " vs " + teamB + " at " + matchtimeStr + " the current time is" + nowStr + "</h1>");
        // display the diffStr
        out.println("<h2>Difference is " + diffStr + "</h2>");
        out.close();
        DB.DataBase.storeMatch(teamA, teamB, date, matchtimeStr, overs, diffMilli);
    }

    @Override
    public void destroy() {
        /*
         * leaving empty for now this can be used when we want to do something at the
         * end of Servlet life cycle
         */
    }

    public static void main(String[] args) {
        DB.DataBase.storeMatch("India", "Pakistan", "15-06-21", "20-50", "6", 7000);
        System.out.println("Good bye");
    }
}