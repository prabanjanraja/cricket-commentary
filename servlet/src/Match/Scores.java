package Match;

import java.io.IOException;
import DB.DataBase;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// create a class extending HttpServletRequest
public class Scores extends HttpServlet {

    // create a method to handle the get request
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        // set response content type to json
        response.setContentType("application/json");

        // write the output from the getRuns method to the response
        response.getWriter().write(DataBase.getRuns(id));
    }
}
