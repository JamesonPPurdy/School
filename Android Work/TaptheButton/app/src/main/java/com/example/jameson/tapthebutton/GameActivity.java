package com.example.jameson.tapthebutton;

import android.content.Intent;
import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.Random;

public class GameActivity extends AppCompatActivity {

    // interface variables
    private ImageButton btnPoints;
    private ImageButton btnNewGame;
    private ImageButton btnHighscores;
    private ImageButton btnDoublePoints;
    private LinearLayout gameLayout;
    private TextView txtTimer;
    private TextView txtPoints;
    private TextView txtDoubleTimer;

    // private variables
    private String timerString;
    private String timesUp;

    int pointsAwarded;
    int currentPoints;
    int layoutHeight;
    int layoutWidth;
    int btnWidth;
    int btnHeight;

    // random object for button placement
    Random random;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);


        // creating random object
        random = new Random();

        // setting interface variables
        btnPoints = (ImageButton) findViewById(R.id.btnPoints);
        gameLayout = (LinearLayout) findViewById(R.id.topLayout);
        txtTimer = (TextView) findViewById(R.id.txtTimer);
        txtPoints = (TextView) findViewById(R.id.txtPoints);
        txtDoubleTimer = (TextView) findViewById(R.id.txtDoubleTimer);
        btnNewGame = (ImageButton) findViewById(R.id.btnNewGame);
        btnHighscores = (ImageButton) findViewById(R.id.btnHighscores);
        btnDoublePoints = (ImageButton) findViewById(R.id.btnDoublePoints);



        // setting buttons unusable or invisible for now
        btnHighscores.setEnabled(false);
        btnPoints.setEnabled(false);
        btnPoints.setVisibility(View.INVISIBLE);



        // getting from strings.xml
        Bundle bundle = getIntent().getExtras();
        timerString = bundle.getString("timerString");
        timesUp = bundle.getString("timerDoneString");


        // setting default values
        pointsAwarded = 10;
        currentPoints = 0;

        if (savedInstanceState == null) {

            // updating textview for points to 0
            txtPoints.setText(""+currentPoints);

        } else {

            txtTimer.setText(savedInstanceState.getString("timerString"));
            txtDoubleTimer.setText(savedInstanceState.getString("doublePointString"));
            txtPoints.setText(savedInstanceState.getString("pointString"));
            pointsAwarded = savedInstanceState.getInt("points");
            currentPoints = savedInstanceState.getInt("pointsTotal");
            btnDoublePoints.setEnabled(savedInstanceState.getBoolean("doubleButton"));

        }

        // building onclick listeners
        btnPoints.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                onClickPoints(v);
            }
        });

        btnDoublePoints.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                onClickDoublePoints(v);
            }
        });

        btnNewGame.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v) {
                onClickBtnNewGame(v);
            }
        });

        btnHighscores.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v) {
                onClickHighscore(v);
            }
        });


    }

    public void onClickPoints(View v) {

        // getting the height and width of the layout for the game
        layoutHeight = gameLayout.getHeight();
        layoutWidth = gameLayout.getWidth();

        // getting the height and width of the button
        btnWidth = btnPoints.getWidth();
        btnHeight = btnPoints.getHeight();

        // running the thread add points
        new Game(txtPoints).execute(pointsAwarded);

        // updating variable with current points
        currentPoints = Integer.parseInt(txtPoints.getText().toString());

        // setting the button to a random spot while making sure it stays in the layout
        btnPoints.setX(random.nextInt(layoutWidth - btnWidth));
        btnPoints.setY(random.nextInt(layoutHeight - btnHeight));

    }

    public void onClickDoublePoints(View v){

        // moving the button again
        btnPoints.setX(random.nextInt(layoutWidth - btnWidth));
        btnPoints.setY(random.nextInt(layoutHeight - btnHeight));

        // updating how many points are awarded
        pointsAwarded = 20;

        // chaning the image button to say 20
        btnPoints.setBackgroundResource(R.drawable.btn_20points);

        // disabling the double points button
        btnDoublePoints.setEnabled(false);

        doublePointsTimer();

    }

    // the timer
    public void timer() {

        // when the timer starts disable the new game button
        btnNewGame.setEnabled(false);

        // 20 second  timer that increments by 1 second
        new CountDownTimer(20000, 1000) {

            // on every tick of 1 seonds update the timer TextView
            public void onTick(long millisUntilFinished) {

                txtTimer.setText((millisUntilFinished / 1000) + " " + timerString);

            }

            // when the timer runs out disable and hide the poinst buttons and enable the new game/highscores button
            public void onFinish() {

                btnPoints.setEnabled(false);
                btnPoints.setVisibility(View.INVISIBLE);
                btnNewGame.setEnabled(true);

                txtTimer.setText(timesUp);

            }

            // start the timer
        }.start();

    }

    public void onClickBtnNewGame(View v) {

        // button state management
        btnNewGame.setEnabled(false);
        btnDoublePoints.setEnabled(true);
        btnPoints.setEnabled(true);
        btnPoints.setVisibility(View.VISIBLE);

        // reset points givin and total
        currentPoints = 0;
        pointsAwarded = 10;

        // reset the statib score of the game class
        Game.resetScore();

        txtPoints.setText("" + currentPoints);

        // start the timer again
        timer();
    }

    public void doublePointsTimer(){

        new CountDownTimer(5000, 1000) {

            // on every tick of 1 second update the timer TextView
            public void onTick(long millisUntilFinished) {

                txtDoubleTimer.setText((millisUntilFinished / 1000) + " " + timerString);

            }

            // when the timer runs out disable and hide the poinst buttons and enable the new game/highscores button
            public void onFinish() {

                pointsAwarded = 10;
                txtDoubleTimer.setText("");
                btnPoints.setBackgroundResource(R.drawable.btn_10points);

            }

            // start the timer
        }.start();

    }

    public void onClickHighscore(View v) {

        // open the highscores activity
        Intent intent = new Intent("com.example.jameson.POPUPHIGHSCORE");
        Bundle bundle = new Bundle();

        bundle.putString("instructString", getResources().getString(R.string.instruct));
        bundle.putString("nameEntryString", getResources().getString(R.string.name));
        startActivity(intent);

    }

    public void onSaveInstanceState(Bundle savedInstanceState){
        super.onSaveInstanceState(savedInstanceState);
        savedInstanceState.putString("pointString", txtPoints.getText().toString());
        savedInstanceState.putString("doublePointString", txtDoubleTimer.getText().toString());
        savedInstanceState.putString("timerString", txtTimer.getText().toString());
        savedInstanceState.putInt("points", pointsAwarded);
        savedInstanceState.putInt("pointsTotal", currentPoints);
        savedInstanceState.putBoolean("doubleButton", btnDoublePoints.isEnabled());
    }

}
