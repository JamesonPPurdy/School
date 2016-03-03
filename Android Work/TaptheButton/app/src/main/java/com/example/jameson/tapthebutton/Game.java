package com.example.jameson.tapthebutton;

import android.os.AsyncTask;
import android.widget.TextView;

public class Game extends AsyncTask<Integer, Void, Integer>{


    // static score so it persist through being created and destroyed
    static int score;

    // interface objects
    private TextView txtPoints;

    // create the game object and pass in a textview as a paramater
    public Game(TextView target) {

        txtPoints = target;

    }

    @Override
    // the worker thread
    protected Integer doInBackground(Integer... params) {

        score += params[0];

        return score;
    }

    @Override
    // update interface after thread runs
    protected void onPostExecute(Integer result) {

        txtPoints.setText(""+result);
    }

    // reset score for new game
    static public void resetScore() {

        score = 0;

    }

}
