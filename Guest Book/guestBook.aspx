<!DOCTYPE HTML>

<%@ Page Language="C#" Debug="true" ClientTarget="uplevel" EnableEventValidation="false" validateRequest="false"%>
<%@ import Namespace="System.Data.OleDb" %>
<script runat="server">

    string fName;
    string lName;

    OleDbConnection dbConnection;
    OleDbCommand dbCommand;
    string sqlString;
    OleDbDataReader dbReader;

    protected void Page_Load() {

        // Response.Write("Something");

        try {

            // set up connection to database and open the connection
            dbConnection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0; data source=" + Server.MapPath("guestBook.accdb"));
            dbConnection.Open();
            dbCommand = new OleDbCommand("", dbConnection);

            refreshMe();

        } finally {

            // always close connection after everything is run
            dbConnection.Close();
        }
    }

    protected void refreshMe() {

        // populating content
        sqlString = "SELECT * FROM tblGuest ORDER BY ID DESC";
        dbCommand.CommandText = sqlString;

        dbReader = dbCommand.ExecuteReader();

        if (dbReader.HasRows) {
            lblEmptyDb.Visible = false;

            // set the datasource of the repeater to the dbReader and data bind it
            repDisplay.DataSource = dbReader;
            repDisplay.DataBind();

            // close the dbReader
            dbReader.Close();
        } else {
            lblEmptyDb.Visible = true;
        }
    }

    protected void submitMe(Object src, EventArgs args) {

        fName = txtFirstName.Text;
        lName = txtLastName.Text;

        try {

            // open the database connection.
            dbConnection.Open();

            // inserting what is in the guest entry field into the database
            sqlString = "INSERT INTO tblGuest (firstName,lastName,signDate,entry) VALUES " +
                        "(@firstName, @lastName, @signDate, @entry)";
            dbCommand.CommandText = sqlString;

            // if nothing is entered into the entry field
            if (txtEntry.Text.Length == 0) {
                return;
            } else {
                // if nothing is done for the first ir last name.
                if (txtFirstName.Text.Length == 0 || txtLastName.Text.Length == 0) {

                    // make first name anonymous, last name blank
                    fName = "Anonymous";
                    lName = "";

                } else {
                    // otherwise use what was in the text box.
                    fName = txtFirstName.Text;
                    lName = txtLastName.Text;

                }

                // adding the information to the databaseusing paramaterized queries.
                dbCommand.Parameters.AddWithValue("@firstName", Server.HtmlEncode(fName));
                dbCommand.Parameters.AddWithValue("@lastName", Server.HtmlEncode(lName));
                dbCommand.Parameters.AddWithValue("@signDate", DateTime.Today.ToString());
                dbCommand.Parameters.AddWithValue("@entry", Server.HtmlEncode(txtEntry.Text));
                dbCommand.ExecuteNonQuery();

                // interface cleanup
                txtFirstName.Text = "";
                txtLastName.Text = "";
                txtEntry.Text = "";
            }
        } finally {
            refreshMe();
            dbConnection.Close();
        }

    }

</script>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
        <title>Data Access : Binding Data</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Latest compiled JavaScript -->
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <!-- implement a plugin for the counter and the max length -->
        <script src="jquery.simplyCountable.js"></script>
        <!-- style for the back to the top -->
        <style>
            .backToTop {
                font-size:10px;
            }
        </style>
        <script type="text/javascript">

            // slid open and closed the panel if when the check box is checked.
            $(document).ready(function () {
                $('#chkSlide').change(function () {
                    $('#inputPanel').slideToggle();
                });


                // checking is the check box is still check
                if (document.getElementById('chkSlide').checked) {
                    // if it is checked, open the panel
                    $('#inputPanel').show();

                } else {
                    // otherwise close it
                    $('#inputPanel').hide();
                }

                // limit the amount of characters for the guest book entry.
                var MaxLength = 140;

                $('#txtEntry').keypress(function (e) {
                    if ($(this).val().length >= MaxLength) {
                        e.preventDefault;
                    }
                });

                // add a counter for how many characters are left for entry.
                $('#txtEntry').simplyCountable({
                    counter: '#counterEntry',
                    countType: 'characters',
                    maxCount: 140,
                    strictMax: true,
                    countDirection: 'down'
                });
            });

        </script>    
    </head>
    <body>
        <form runat="server">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 id="top">
                            Guest Book : Open Entry Form
                            <asp:CheckBox ID="chkSlide" runat="server" />
                        </h4>
                    </div>
                </div>
                <div id="inputPanel" class="well" style="display:none;background-color:burlywood">
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="txtFirstName" Text="First Name:" runat="server"/>
                            <asp:TextBox ID="txtFirstName" MaxLength="20" CssClass="form-control" runat="server" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="txtLastName" Text="Last Name:" runat="server"/>
                            <asp:TextBox ID="txtLastName" MaxLength="20" CssClass="form-control" runat="server" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="txtEntry" Text="Guest Book Entry:" runat="server"/>
                            <asp:TextBox ID="txtEntry" TextMode="MultiLine" CssClass="form-control" runat="server" />
                            <p id="counterEntry"> </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <asp:Button ID="btnSubmit" Text="Submit entry" CssClass="btn btn-primary" OnClick="submitMe" runat="server" />
                        </div>
                    </div>
                </div>
                <div class="row well"  style="background-color:#28536C">
                    <div class="col-sm-12">
                        <asp:Label ID="lblEmptyDb" style="background-color:#AA7739;color:white" Text="No entries yet!" runat="server" />
                        <asp:repeater id="repDisplay" runat="server">
                            <HeaderTemplate>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <div class="well" style="background-color:#AA7739;color:white">
                                    <asp:Label id="lblFirstName" text='<%# Eval("firstName") %>' runat="server"/>
                                    <br/>
                                    <asp:Label id="lblLastName" text='<%# Eval("lastName") %>' runat="server"/>
                                    <br />
                                    <asp:Label id="lblEntry" text='<%# Eval("entry") %>' runat="server"/>
                                    <br />
                                    <asp:Label id="lblDate" text='<%# Eval("signDate","{0:M/dd/yyyy}") %>' runat="server"/>
                                    <br />
                                    <asp:Label ID="lblBackToTop" CssClass="backToTop" Text="<a href='#top'>Back to top</a>" runat="server" />
                                </div>
                            </ItemTemplate>
                            <FooterTemplate>
                            </FooterTemplate>
                        </asp:repeater>
                    </div>
                </div>
            </div>
        </form>
    </body>
</html>