const steamKey = "6B0614CB785086AD3B51C88BA071D32F";

fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/', {
  method: 'GET', //GET is the default.
  mode: 'no-cors',
  credentials: 'include', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  
})
  .then(function (response) {
    console.log(response);
    return response;
  })
  .then(function (data) {
    console.log(data);
  });
