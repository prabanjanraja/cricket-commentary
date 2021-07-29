package Match;

import java.io.IOException;
import DB.DataBase;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Schedule extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Setting up the content type of webpage as json
        response.setContentType("application/json");
        response.getWriter().write(DataBase.getSchedule());

    }

}
