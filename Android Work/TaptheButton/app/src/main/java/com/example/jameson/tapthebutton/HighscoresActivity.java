package com.example.jameson.tapthebutton;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class HighscoresActivity extends AppCompatActivity {

    // interface variables
    private TextView txtInstruct;
    private EditText txtName;
    private Button btnSubmit;

    // private variables
    private String instruct;
    private String name;

    Highscore highscore;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_highscores);

        btnSubmit = (Button) findViewById(R.id.btnSubmit);
        txtInstruct = (TextView) findViewById(R.id.txtInstruct);
        txtName = (EditText) findViewById(R.id.txtName);

        Bundle bundle = getIntent().getExtras();

        instruct = bundle.getString("instructString");
        name = bundle.getString("nameEntryString");

        txtInstruct.setText(instruct);
        txtName.setHint(name);

        btnSubmit.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                onClickSubmit(v);
            }
        });

    }

    public void onClickSubmit(View v){



        highscore = new Highscore(this, txtName.getText().toString(), 5);

        highscore.open();

        highscore.execute();

        txtInstruct.setText(highscore.getFirstName() + " " + highscore.getFirstScore() + "\n" +
                            highscore.getSecondName() + " " + highscore.getSecondScore() + "\n" +
                            highscore.getThirdName() + " " + highscore.getThirdScore());
        highscore.close();

    }

}
