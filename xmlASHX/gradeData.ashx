<%@ WebHandler Language="C#" Class="gradeData" %>

using System;
using System.Web;
using System.Xml;
using MySql.Data.MySqlClient;
using System.Data;

public class gradeData : IHttpHandler {

    private MySqlConnection dbConnection;
    private MySqlDataAdapter dbAdapter;
    private DataSet dsStudentData;

    public void ProcessRequest (HttpContext context) {

        dbConnection = new MySqlConnection("Database=jpurdy; Data Source=localhost; username=jpurdy; password=jp0278850");
        dbConnection.Open();
        dbAdapter = new MySqlDataAdapter("SELECT * FROM tblstudents", dbConnection);
        dsStudentData = new DataSet();
        dbAdapter.Fill(dsStudentData, "studentdata");
        dbAdapter = new MySqlDataAdapter("SELECT * FROM tblcoursegrades", dbConnection);
        dbAdapter.Fill(dsStudentData, "gradedata");

        XmlTextWriter xmlDoc = new XmlTextWriter(context.Response.OutputStream, null);
        xmlDoc.Formatting = Formatting.Indented;
        context.Response.ContentType = "text/xml";

        xmlDoc.WriteStartDocument();

        xmlDoc.WriteStartElement("gradedata");
        for (int n = 0; n < dsStudentData.Tables["studentdata"].Rows.Count; n++) {

            xmlDoc.WriteStartElement("student");
            xmlDoc.WriteAttributeString("id", dsStudentData.Tables["studentdata"].Rows[n]["id"].ToString());

            xmlDoc.WriteStartElement("name");
            xmlDoc.WriteString(dsStudentData.Tables["studentdata"].Rows[n]["name"].ToString());
            xmlDoc.WriteEndElement();

            xmlDoc.WriteStartElement("phone");
            xmlDoc.WriteString(dsStudentData.Tables["studentdata"].Rows[n]["phone"].ToString());
            xmlDoc.WriteEndElement();

            xmlDoc.WriteStartElement("grades");
            for (int i = 0; i < dsStudentData.Tables["gradedata"].Rows.Count; i++) {
                if (dsStudentData.Tables["studentdata"].Rows[n]["id"].ToString().Equals(dsStudentData.Tables["gradedata"].Rows[i]["id"].ToString())){
                    xmlDoc.WriteStartElement("grade");
                    xmlDoc.WriteString(dsStudentData.Tables["gradedata"].Rows[i]["grade"].ToString());
                    xmlDoc.WriteEndElement();
                }
            }
            xmlDoc.WriteEndElement();

            xmlDoc.WriteEndElement();

        }

        xmlDoc.WriteEndElement();
        xmlDoc.WriteEndDocument();
        xmlDoc.Close();
        dbConnection.Close();


    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}