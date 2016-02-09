<%@ Page Language="C#" Debug="true" ClientTarget="uplevel" %>
<!DOCTYPE html>

<script runat="server">

    // create the weblogin object
    WebLogin weblogin;

    protected void page_load() {

        // on first visit or if the session is non-existent
        if ((!Page.IsPostBack) || (Session["weblogin"] == null)) {
            // first visit
            weblogin = new WebLogin("jpurdy", "jpurdy", "jp0278850", "tblLogin");
            Session["weblogin"] = weblogin;
        } else {
            // postback
            weblogin = (WebLogin)Session["weblogin"];
        }



    }

    protected void checkMe(Object src, EventArgs args) {

        // get the username and the password for logging in from the text boxes
        weblogin.username = txtUserName.Text;
        weblogin.password = txtPassword.Text;
        // try to unlock
        if (weblogin.unlock()) {
            Response.Redirect("EditSamples.aspx");
        } else {
            lblFeedback.Text = "Incorrect input, please try again...";
            txtUserName.Text = "";
            txtPassword.Text = "";

        }

    }

</script>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Latest compiled JavaScript -->
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </head>
    <body>
        <form runat="server">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <h2>Login</h2>
                        Please enter your Username and Password...
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="txtUserName">UserName:</label>
                            <asp:TextBox id="txtUserName" CSSClass="form-control" Maxlength="50" runat="server" />
                        </div>
                        <div class="form-group">
                            <label for="txtPassword">Password:</label>
                            <asp:TextBox id="txtPassword" CSSClass="form-control" Textmode="password" maxlength="50" runat="server" />
                        </div>
                        <div class="form-group">
                            <asp:Button id="btnSubmit" text="Submit" CSSClass="btn btn-primary" onclick="checkMe" runat="server" />
                            <asp:Label id="lblFeedback" CssClass="text-info" runat="server" />
                        </div>
                    </div>
                </div>
           </div>
        </form>
	</body>
</html>
