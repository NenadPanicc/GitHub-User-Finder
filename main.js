$(document).ready(() => {
    var username = $('#forma').val();
   $('#forma').keyup((e) => {
    var username = e.target.value;
        $.ajax({
            url:"https://api.github.com/users/"+username,
            data: {
                client_id:'4a95d8316c45472570c8',
                client_secret:'74a468062496bac4edb0fe517be7a6f771e1358c'
            }
        }).done((user) => {
            $.ajax({
                url:"https://api.github.com/users/"+username+'/repos',
                data: {
                    client_id:'4a95d8316c45472570c8',
                    client_secret:'74a468062496bac4edb0fe517be7a6f771e1358c',
                    sort:"created_asc",
                    per_page:5 
                }
                
            }).done(function(repos){
                $.each(repos, function(_index, repo){
                  $('#repos').append(`
                  <div class="container">
                  <div class="well " >
                  <div class="card " >
                    <div class="row">
                      <div class="col-md-6">
                        <strong class="p-3 ">${repo.name}</strong>: ${repo.description}
                      </div>
                      <div class="col-md-4">
                      <h5>
                        <span class="badge badge-dark m-2">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary m-2">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success m-2">Stars: ${repo.stargazers_count}</span>
                      </h5>  
                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark m-2">Repo Page</a>
                      </div>
                    </div>
                  </div>
                  </div>
                  `);
                });
              });
            $('#user-info').html(`
            <div class="container">
            <div class="card" >
            <div class="card-body " >
            <div class="row">
                 <div class="col-md-6">
                    <h5 class="card-title">${user.name}</h5>
                    <img class="thumbnail ml-2" src="${user.avatar_url}" width="500px" height="500px">
                    <a href="${user.html_url}" target="_blank" class="btn btn-outline-info btn-block mt-2" >Visit profile</a>
                 </div>

                <div class="col-md-6 ">
                    <h4><span class="badge badge-info p-2 ml-5 mt-5">Joined: ${user.created_at}</span></h4>
                    <h4><span class="badge badge-info p-2 ml-5">Company: ${user.company}</span></h4>
                    <h4><span class="badge badge-info p-2 ml-5">Location: ${user.location}</span></h4>
                    <h4><span class="badge badge-info p-2 ml-5">Followers: ${user.followers}</span></h4>
                </div>
            </div>
            </div>
          </div>
            </div>
            `)
        })
   })
   $('#forma').keydown(() => {
     $('#repos').empty();
   })
   console.log(username)
})