$(document).ready(function () {
  $('#searchUser').on('keyup', function(e) {
     let username = e.target.value;

    //  make request to Github
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: 
      {
        client_id:'292e2b78a29135ae7aa0',
        client_secret:'28fb7c85d9c4fcf3fae6243198e2f33f1abc7502'  
      }
    }).done(function(user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: 
        {
          client_id:'292e2b78a29135ae7aa0',
          client_secret:'28fb7c85d9c4fcf3fae6243198e2f33f1abc7502',
          sort: 'created: asc',
          per_page: 5 
        }
      }).done(function(repos) {
         $.each(repos, function(index, repo) {
           $('#repos').append(`
         
           
             <div class="repo-intro">
                <div class="row p-2 repo-info">
                   <div class="col-md-7 mb-1">
                      <strong>${repo.name}</strong>
                   </div>
                   <div class="col-md-3">
                   <span class="btn btn-dark repo repo-btn mb-2">Forks: ${repo.forks_count}</span>
                   <span class="btn btn-primary repo repo-btn mb-2">Watchers: ${repo.watchers_count}</span>
                   <span class="btn btn-success repo repo-btn mb-2">Stars: ${repo.stargazers_count}</span>
                   </div>
                   <div class="col-md-2">
                      <a href="${repo.html_url}" target="_blank" class="btn btn-secondary repo-btn repo mb-2">Repo Page</a>
                   </div>
                </div>
             </div>
           `);
         });
      });
       $('#profile').html(`
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                  <div class="col-md-3">
                    <img class="img-thumbnail avatar" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-danger btn-block mb-3" href="${user.html_url}">View Profile</a>
                  </div>
                  <div class="col-md-9">
                      <span class="mb-2 btn btn-dark repo">Public Repos: ${user.public_repos}</span>
                      <span class="mb-2 btn btn-primary repo">Public Gists: ${user.public_repos}</span>
                      <span class="mb-2 btn btn-success repo">Followers: ${user.followers}</span>
                      <span class="mb-2 btn btn-info repo">Following: ${user.following}</span>
                      <br><br>
                      <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog : ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since : ${user.created_at}</li>
                      </ul>
                  </div>
                </div>
            </div>
        </div>
       
        
        <h3 class="page-header mt-3">Latest Repos</h3>
        <div class="mb-5" id="repos"></div>
       `);
    });
  });
});


 