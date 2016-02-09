<%@ Page Language="C#" Debug="true" ClientTarget="uplevel" ValidateRequest="false"%>

<!DOCTYPE html>

<script runat="server">
    SamplePages sample;

    public void Page_Load() {


        sample = new SamplePages();

        if (!Page.IsPostBack) {

            update();
        }

    }

    public void update() {

        sample = new SamplePages();

        repDisplay.DataSource = sample.getData(3);
        repDisplay.DataBind();

    }

</script>

<html>
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
        <title>ASP.net work</title>
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
                                <li class="active"><a href="#">ASP.net Work</a></li> 
                                <li><a href="EditSamples.aspx">Admin Page</a></li> 
                            </ul>
                        </div>
                    </div>
                </nav>
            <div class="row">
                <div class="col-sm-12 jumbotron text-center">
                    <h1>ASP.net</h1>
                </div>
            </div>
            <div class="well  text-center">
                <asp:repeater id="repDisplay" runat="server">
                    <ItemTemplate>
                        <asp:label id="lblSampleName" text='<%# Eval("sampleName")%>' runat="server" />
                        <br />
                        <asp:Image ID="imgSample" src='<%# Eval("imgSource")%>' AlternateText='<%# Eval("sampleName")%>' runat="server" />
                        <br />
                        <asp:Label ID="lblDesc" Text='<%# Eval("sampleDesc")%>' runat="server" />
                        <br />
                        <a href='<%# Eval("downloadSource")%>'>This is a download or a link for the sample</a>
                    </ItemTemplate>
                </asp:repeater>
            </div>
        </div>
    </form>
</body>
</html>
