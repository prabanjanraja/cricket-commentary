import static java.lang.System.out;

import java.util.Random;

public class App extends Thread {
    int over;
    int wickets;
    int ball;

    private static void sleep() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    Random rand = new Random();

    private int score() {
        // increment the ball
        this.ball++;
        int score = this.rand.nextInt(100);
        // a condition to add out
        if (score % 13 == 0)
            return -1;
        // modulo 7 so the score will be in the range of 0 to 6
        return score % 7;
    }

    // to set the no of overs and wickets
    private void match(int over, int wickets) {
        this.ball = 0;
        this.over = over;
        this.wickets = wickets;
    }

    public static void main(String args[]) {
        var thread = new App();
        thread.match(2, 10);
        var score = 0;
        var target = 20;
        int run;
        while (thread.ball < (thread.over * 6) && thread.wickets >= 0 && target > score) {
            run = thread.score();
            if (run == -1)
                thread.wickets -= 1;
            else
                score += run;
            // print the run, score, target and wickets left
            out.println("Run: " + run + " Score: " + score + " Target: " + target + " Wickets: " + thread.wickets);
            sleep();
        }

        // if ballis greater than over*6 then
        // wickets is less than zero
        if (thread.ball > (thread.over * 6))
            out.println("Out of Balls");
        // else if wickets is less than zero
        // then out of wickets
        else if (thread.wickets < 0)
            out.println("Out of Wickets");
        // else the player has won
        else
            out.println("Team B won the match");
        out.println("Final Score: " + score + " Target: " + target);
        out.println("Wickets: " + thread.wickets);
    }
}
