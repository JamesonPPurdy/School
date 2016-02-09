<%@ Page Language="C#" Debug="true" ClientTarget="uplevel" ValidateRequest="false"%>
<%@ Import Namespace="System.IO" %>

<!DOCTYPE html>

<script runat="server">

    SamplePages sample;

    int selectedPage;

    public void Page_Load() {

        sample = new SamplePages();

        // if not logged in
        if (Session["weblogin"] == null) {

            // redirect to the login page
            Response.Redirect("Login.aspx");

            // if the WebLogin access fails
        } else if (((WebLogin) Session["weblogin"]).access != true) {
            // redirect to the login page
            Response.Redirect("Login.aspx");

        } else if (!Page.IsPostBack) {

            // on the first visit load the pages list
            update();
        }

    }

    public void update() {

        // clear the drop down list so no dupliucates
        lstPages.Items.Clear();

        // gice the drop down a datasource
        lstPages.DataSource = sample.pages();

        // tell it what the text values will be
        lstPages.DataTextField = "pageName";

        // tell it what the IDs will be
        lstPages.DataValueField = "pageID";

        // bind the data source
        lstPages.DataBind();


    }

    public void selectPage(Object src, EventArgs args) {

        // convert the currently selected value to an integer
        Int32.TryParse(lstPages.SelectedValue, out selectedPage);

        // set the repeater data source to the query from the dataclass for the selected page
        repDisplay.DataSource = sample.getData(selectedPage);

        // bind the data source
        repDisplay.DataBind();

        // run the update method to update the list
        update();
    }

    public void deleteSample(Object src, EventArgs args) {

        // run the delete method of the dat class where the id is the button of the sample it is linked to in the repeater
        sample.deleteSample(Convert.ToInt32(((Button)src).CommandArgument));

        update();

    }

    public void addSample(Object src, EventArgs args) {

        // get the id of the page you want to add the sample to
        Int32.TryParse(lstPages.SelectedValue, out selectedPage);

        // set up the sring for the file uploading
        string filename;
        
        // an integer of the file size being uploaded
        int filesize;

        //ERROR CHECK I - has a file been selected?s

        if (!upFile.HasFile) {

            lblFeedback.Text = "Error : Please select an image to upload";

        } else {
            // Grab filename of uploaded file
            filename = upFile.FileName;
            // ERROR CHECK II - is the file name to long?
            if (filename.Length >= 200) {
                lblFeedback.Text = "Error : filename must be less than 200 characters";
            } else {

                // ERROR CHECK III - correctfile type

                if ((Path.GetExtension(filename).ToLower() != ".jpg") &&
                    (Path.GetExtension(filename).ToLower() != ".png") &&
                    (Path.GetExtension(filename).ToLower() != ".gif")) {
                    lblFeedback.Text = "Error : incompatible file types";
                } else {

                    filesize = upFile.PostedFile.ContentLength;

                    // ERROR CHECK IV - no files bigger than 2MB
                    if (filesize > 2000000) {
                        lblFeedback.Text = "Error : filesize is to large";
                    } else {

                        if (File.Exists(Server.MapPath("images/") + filename)) {

                            int fileCount = 1;

                            // break the file into parts
                            // isolate the file name without the extension
                            string fileNoExtension = Path.GetFileNameWithoutExtension(Server.MapPath("images/") + filename);
                            // isolate the extension
                            string fileExtension = Path.GetExtension(Server.MapPath("images/") + filename);
                            // isolate the path
                            string path = Path.GetDirectoryName(Server.MapPath("images/") + filename);
                            // set the alternate filename to the file name
                            string altFilename = filename;

                            // if the file you attempt to upload exists
                            while (File.Exists(Server.MapPath("images/") + altFilename)) {

                                // format it to add a number to the end
                                string tmpFileName = string.Format("{0}({1}){2}", fileNoExtension, fileCount++, fileExtension);
                                // set alternate filename to the formatted file
                                altFilename = tmpFileName;

                            }



                            // add the image to the database
                            sample.addSample(Server.HtmlEncode(txtSampleNameInput.Text),selectedPage,Server.HtmlEncode(txtDescInput.Text),Server.MapPath("images/") + altFilename,Server.HtmlEncode(txtDownloadSource.Text));

                            // ready to save file!!!
                            upFile.PostedFile.SaveAs( Server.MapPath("images/") + altFilename);
                            // give feedback to user
                            lblFeedback.Text = "<b> Uploaded <br/>";
                            lblFeedback.Text += altFilename + "<br/>";
                            lblFeedback.Text += filesize + " bytes <br/>";

                        } else {

                            // add the image to the database
                            sample.addSample(Server.HtmlEncode(txtSampleNameInput.Text),selectedPage,Server.HtmlEncode(txtDescInput.Text),"images/"+filename,Server.HtmlEncode(txtDownloadSource.Text));

                            // ready to save file!!!
                            upFile.PostedFile.SaveAs(Server.MapPath("images/") + filename);
                            // give feedback to user
                            lblFeedback.Text = "<b> Uploaded <br/>";
                            lblFeedback.Text += filename + "<br/>";
                            lblFeedback.Text += filesize + " bytes <br/>";
                        }
                    }
                }
            }
        }

        update();
    }

    public void editSample(Object src, EventArgs args) {

        // get the id of the sample when updating
        int tmpSample = Convert.ToInt32(((Button)src).CommandArgument);

        // find the tex boxes in the repeater
        foreach(RepeaterItem item in repDisplay.Items) {

            // and make them accesable
            TextBox txtName = (TextBox)item.FindControl("txtSampleName");
            TextBox imgSample = (TextBox)item.FindControl("imgSample");
            TextBox txtDownloadLink = (TextBox)item.FindControl("txtDownloadLink");
            TextBox txtDesc = (TextBox)item.FindControl("txtDesc");

            // rune the update method of the data class
            sample.updateSample(Server.HtmlEncode(txtName.Text), tmpSample, Server.HtmlEncode(imgSample.Text),Server.HtmlEncode(txtDesc.Text),Server.HtmlEncode(txtDownloadLink.Text));
        }

        update();

    }

</script>

<html>
    <head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
            <title>Android work</title>
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
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">Portfolio Site</a>
                        </div>
                        <div>
                            <ul class="nav navbar-nav">
                                <li><a href="HomePage.aspx">Home</a></li>
                                <li><a href="Android.aspx">Android Work</a></li>
                                <li><a href="ASP.aspx">ASP.net WOrk</a></li> 
                                <li class="active"><a href="#">Admin Page</a></li> 
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="row">
                    <div class="col-sm-12 jumbotron text-center">
                        <h1>Edit Pages</h1>
                    </div>
                </div>
                <div class="row text-center" style="padding-left:20px">
                    <div class="col-sm-6">
                        <asp:DropDownList id="lstPages" CssClass="form-control" runat="server" />
                    </div>
                    <div class="col-sm-6">
                        <asp:Button ID="btnPageSelect" CssClass="form-control btn btn-primary" OnClick="selectPage" Text="Select Page" runat="server" />
                    </div>
                </div>
                <div class="well text-center" >
                    <asp:repeater id="repDisplay" runat="server">
                        <ItemTemplate>
                            <asp:TextBox CssClass="form-control" id="txtSampleName" text='<%# Eval("sampleName")%>' runat="server" />
                            <br />
                            <asp:TextBox ID="imgSample" CssClass="form-control" Text='<%# Eval("imgSource")%>' runat="server" />
                            <br />
                            <asp:TextBox ID="txtDesc" CssClass="form-control" Text='<%# Eval("sampleDesc")%>' runat="server" />
                            <br />
                            <asp:TextBox ID="txtDownloadLink" CssClass="form-control" Text='<%# Eval("downloadSource")%>' runat="server" />
                            <br />
                            <asp:Button ID="btnDelete" OnClick="deleteSample" Text="Delete This Sample" CommandArgument='<%# Eval("sampleID")%>' runat="server" />
                            <asp:Button ID="btnEdit" OnClick="editSample" Text="Edit this Sample" CommandArgument='<%# Eval("sampleID")%>' runat="server" />
                        </ItemTemplate>
                    </asp:repeater>
                </div>
                <div id="pnlAdd" class="row" style="padding-left:20px">
                    <div class="col=sm-12">
                        <h2>Add a sample</h2>
                        <br />
                        <label for="txtSampleNameINput">Sample Name</label>
                        <asp:TextBox id="txtSampleNameInput" CssClass="form-control" text="" runat="server" />
                        <br />
                        <label for="upFile">Choose image for upload</label>
                        <asp:FileUpload ID="upFile" runat="server" />
                        <br />
                        <label for="txtDescInput">Description of the sample</label>
                        <asp:TextBox ID="txtDescInput" CssClass="form-control" Text='<%# Eval("sampleDesc")%>' runat="server" />
                        <br />
                        <label for="txtDownloadSource">The file to download or go to</label>
                        <asp:TextBox ID="txtDownloadSource" CssClass="form-control" Text='<%# Eval("downloadSource")%>' runat="server" />
                        <br />
                        <asp:Button ID="btnAdd" OnClick="addSample" Text="Add Sample" runat="server" />
                        <br />
                        <asp:Label ID="lblFeedback" runat="server" />
                    </div>
                </div>
            </div>
        </form>
    </body>
</html>
