using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using MySql.Data.MySqlClient;

/// <summary>
/// Summary description for imageReader
/// </summary>
public class SamplePages {

    // database variables
    private MySqlConnection dbConnection;
    private string connectionString = "Database=jpurdy; Data Source=localhost;user id=jpurdy; password=jp0278850";
    private MySqlCommand dbCommand;
    private string sqlString;
    private MySqlDataReader dbReader;
    private DataTable dtPages, dtSamples;

    public SamplePages() {

        

    }

    // getting the infmoration from th samples table for use elsewhere
    public DataTable getData(int currentPage) {

        try {

            // open database connection
            dbConnection = new MySqlConnection(connectionString);
            dbConnection.Open();

            // set sql string
            sqlString = "SELECT * FROM tblSample WHERE pageID =" + currentPage;

            // construct dbCommand object
            dbCommand = new MySqlCommand(sqlString, dbConnection);
            dbCommand.Parameters.AddWithValue("@pageID", currentPage);

            // execute the reader
            dbReader = dbCommand.ExecuteReader();

            // if the db reader has no rows
            if (!dbReader.HasRows) {

                return null;

            } else {

                // construct the datatable
                dtSamples = new DataTable();

                // load the reader to the datatable
                dtSamples.Load(dbReader);

                // close the dbReader
                dbReader.Close();

                // return the datatable
                return dtSamples;
            }

        } finally {

            // close the dbCOnnection
            dbConnection.Close();

        }

    }

    // getting the information for the pages table to use elsewhere
    public DataTable pages() {

        try {

            // open connection
            dbConnection = new MySqlConnection(connectionString);
            dbConnection.Open();

            // set the sqlString
            sqlString = "SELECT * From tblPages";

            // set db Command
            dbCommand = new MySqlCommand(sqlString, dbConnection);
            dbReader = dbCommand.ExecuteReader();

            if (!dbReader.HasRows) {

                return null;

            } else {

                // construc the datatable
                dtPages = new DataTable();

                // load the dataReader into the dataTable
                dtPages.Load(dbReader);

                // close the reader
                dbReader.Close();

                // return the datatable
                return dtPages;
            }

        } finally {

            dbConnection.Close();

        }

    }

    // m,ethod for deleting a sample
    public void deleteSample(int selectedSample) {
        try {

            // open connection
            dbConnection = new MySqlConnection(connectionString);
            dbConnection.Open();

            // prepare the sql string
            sqlString = "DELETE from tblSample where sampleID = @sampleID";

            // create the command object
            dbCommand = new MySqlCommand(sqlString, dbConnection);
            dbCommand.Parameters.AddWithValue("@sampleID", selectedSample);

            // execute the command
            dbCommand.ExecuteNonQuery();

        } finally {

            dbConnection.Close();

        }

    }

    // method for adding a new sample
    public void addSample(string sampleName, int currentPage, string sampleDesc, string imgSource, string downloadSource) {

        try {

            // open the connectiuon
            dbConnection = new MySqlConnection(connectionString);
            dbConnection.Open();

            // set the string
            sqlString = "INSERT INTO tblSample (pageID, sampleName, sampleDesc, imgSource, downloadSource) VALUES" +
                "(@pageID, @sampleName, @sampleDesc, @imgSource, @downloadSource)";

            // create the command object
            dbCommand = new MySqlCommand(sqlString, dbConnection);

            // replace the values with what is going to be actually added
            dbCommand.Parameters.AddWithValue("@pageID", currentPage);
            dbCommand.Parameters.AddWithValue("@sampleName", sampleName);
            dbCommand.Parameters.AddWithValue("@sampleDesc", sampleDesc);
            dbCommand.Parameters.AddWithValue("@imgSource", imgSource);
            dbCommand.Parameters.AddWithValue("@downloadSource", downloadSource);

            dbCommand.ExecuteNonQuery();

        } finally {

            dbConnection.Close();

        }

    }

    // method for updating a sample
    public void updateSample(string sampleName, int sampleID, string imgSource, string sampleDesc, string downloadSource) {

        try {

            dbConnection = new MySqlConnection(connectionString);
            dbConnection.Open();

            sqlString = "UPDATE tblSample SET sampleName= @sampleName, sampleDesc= @sampleDesc, imgSource= @imgSource, downloadSource= @downloadSource "
                        + "WHERE sampleID= @sampleID";

            dbCommand = new MySqlCommand(sqlString, dbConnection);

            dbCommand.Parameters.AddWithValue("@sampleName", sampleName);
            dbCommand.Parameters.AddWithValue("@sampleDesc", sampleDesc);
            dbCommand.Parameters.AddWithValue("@imgSource", imgSource);
            dbCommand.Parameters.AddWithValue("@downloadSource", downloadSource);
            dbCommand.Parameters.AddWithValue("@sampleID", sampleID);

            dbCommand.ExecuteNonQuery();

        } finally {

            dbConnection.Close();

        }

    }

}