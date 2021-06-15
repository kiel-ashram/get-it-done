var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function () {
    //get repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if(repoName) {
        //display repo name in header
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
    else {
        //if no repo given, redirect to homepage
        document.location.replace("./index.html")
    }
}

var getRepoIssues = function (repoName) {
    var apiUrl = "https://api.github.com/repos/" + repoName + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repoName);
                }
            });
        } else {
            document.location.replace("./index.html");
        }
    });
};

var displayIssues = function (issues) {
    //tell user when they search a repo with no open issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues.";
        return;
    }
    for (var i = 0; i < issues.length; i++) {

        //create link element to take users to issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue TITLE
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a TYPE element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function (repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();