package Match;

import java.util.TimerTask;

public class MyTimerTask extends TimerTask {

    // create the variables teamA, teamB, overs,
    // idString
    private String teamA;
    private String teamB;
    private String overs;
    private String idString;
    // create a constructor and initialize the variables teamA, teamB, overs,
    // idString

    public MyTimerTask(String teamA, String teamB, String overs, String idString) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.overs = overs;
        this.idString = idString;
        // this.timediff = timediff;

    }

    // create a run method
    @Override
    public void run() {
        GenScores.startMatch(teamA, teamB, overs, idString);
    }
}
