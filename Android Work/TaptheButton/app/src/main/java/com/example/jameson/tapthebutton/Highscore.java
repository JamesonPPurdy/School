package com.example.jameson.tapthebutton;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.os.AsyncTask;

public class Highscore extends AsyncTask<Void, Void, Void>{

    // final variables for database
    private final String DATABASE_NAME = "highscore";
    private final int DATABASE_VERSION = 1;


    // private variables
    private int id, id2, id3;
    private String name, name2, name3;
    private int score, score2, score3;
    private String nameEnter;
    private int scoreEnter;

    // cursor object to navigate through records
    private Cursor cursor;
    // our database
    private SQLiteDatabase db;
    // the context of the application - needs it to do any database work
    private Context context;
    // our custom DBHelper object (inner class!)
    private DBHelper dbHelper;

    public Highscore(Context ctx, String nameToEnter, int scoreToEnter) {

        scoreEnter = scoreToEnter;
        nameEnter = nameToEnter;

        context = ctx;

        // set default values
        id = -1;
        name= "";
        score = -1;

        id2 = -1;
        name2= "";
        score2 = -1;

        id3 = -1;
        name3= "";
        score3 = -1;

        cursor = null;
        db = null;



    }

    protected Void doInBackground(Void... params){

        // supposed to write to database and then read from it in a thread
        setHighScore();
        getHighScores();

        return null;
    }


    // highscore stuff that doesnt do much right nnow
    public int getFirstScore(){

        return score;

    }

    public String getFirstName(){

        return name;

    }
     public int getSecondScore(){

        return score2;

    }

    public String getSecondName(){

        return name2;

    }
     public int getThirdScore(){

        return score3;

    }

    public String getThirdName(){

        return name3;

    }


    // open database
    public void open(){

        dbHelper = new DBHelper();

        db = dbHelper.getWritableDatabase();

    }

    public void close(){
    // close database
        db.close();
        db = null;

    }

    public void setHighScore(){

        // supposed to write to the database the score and the name of the person

        db.execSQL("INSERT INTO tblHighscore (name, score)" + "VALUES(" + nameEnter + "','" + scoreEnter + ")");


    }

    public Boolean getHighScores() {

        // set the variables for the top 3 scores supposedly

        try {


            cursor = null;

            if (db == null) return false;



            cursor = db.rawQuery("SELECT * FROM tblHighscores ORDER BY Score DESC Limit 3", null);

            if (cursor.getCount() == 0) return false;

            cursor.move(0);

            id = cursor.getInt(0);
            name = cursor.getString(1);
            score = cursor.getInt(2);

            cursor.move(1);

            id2 = cursor.getInt(0);
            name2 = cursor.getString(1);
            score2 = cursor.getInt(2);

            cursor.move(2);

            id3 = cursor.getInt(0);
            name3 = cursor.getString(1);
            score3 = cursor.getInt(2);


        } catch(Exception e) {

        }

        return true;

    }


    // DB Helper
    private class DBHelper extends SQLiteOpenHelper {

        public DBHelper() {
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        }
    }

}
