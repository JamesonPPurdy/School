package com.example.jameson.tapthebutton;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class MainMenu extends AppCompatActivity {

    private ImageButton btnPlay;
    private ImageButton btnHighscore;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);

        btnPlay = (ImageButton) findViewById(R.id.btnPlay);
        btnHighscore = (ImageButton) findViewById(R.id.btnHighscore);

        btnPlay.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                onClickPlay(v);
            }
        });

        btnHighscore.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                onClickHighscore(v);
            }
        });

        try {
            // build the full path to the database in the databases folder (where our db goes!)
            String destPath = "/data/data/" + getPackageName() + "/databases/highscore";
            // construct a file object
            File f = new File(destPath);

            // does the database file exist?
            if (!f.exists()) {
                // we have to bundle the database with app - first run!
                Log.d("jameson", "Bundling database!");

                // manually make the databases folder
                File directory = new File("/data/data/" + getPackageName() + "/databases");
                directory.mkdir();

                copyDB(getBaseContext().getAssets().open("highscore"), new FileOutputStream(destPath));
            }
        } catch (IOException e) {
            Log.d("jameson", "IOException: " + e.getMessage());
        }


    }

    public void onClickPlay(View v) {


        // open the game activity
        Intent intent = new Intent("com.example.jameson.GAMEACTIVITY");
        Bundle bundle = new Bundle();

        bundle.putString("timerString", getResources().getString(R.string.timeUntil));
        bundle.putString("timerDoneString", getResources().getString(R.string.timeUp));

        intent.putExtras(bundle);
        startActivity(intent);

    }

    public void onClickHighscore(View v) {

        // open the highscore activity
        Intent intent = new Intent("com.example.jameson.POPUPHIGHSCORE");
        Bundle bundle = new Bundle();

        bundle.putString("instructString", getResources().getString(R.string.instruct));
        bundle.putString("nameEntryString", getResources().getString(R.string.name));
        intent.putExtras(bundle);
        startActivity(intent);

    }

    private void copyDB(InputStream inputStream, FileOutputStream fileOutputStream) throws IOException {
        // array of 1024 bytes of data (1K)
        byte[] buffer = new byte[1024];

        int length;
        // read the first 1K of data from inputStream
        length = inputStream.read(buffer);
        while (length > 0){
            // write the data to the outputstream
            fileOutputStream.write(buffer, 0, length);
            // read the next 1K of data
            length = inputStream.read(buffer);
        }

        // close the streams
        inputStream.close();
        fileOutputStream.close();

        Log.d("jameson", "Database has been bundled :)");
    }

}
