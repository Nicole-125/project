// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 8081;

// Reemplaza 'BACKEND_URL' con la URL real del backend
const backendUrl = 'https://backend-xqwtvnmaqq-uc.a.run.app/data';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(backendUrl);
    res.send(`
      <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-health system</title>
        <!-- Bootstrap CSS -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom CSS -->
        <link href="style.css" rel="stylesheet">
        </head>
      
        <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">E-health system</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="loggin.html">Log in</a>
                   
                </li>
                
                <!--<li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Welcome</h1>
            <p class="lead">In order to be able to access to E-health system and its online services it is needed you log in through your email and password.</p>
            <hr class="my-4">
            <!-- <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> -->
            <a class="btn btn-primary btn-lg" href="loggin.html"" role="button">Log in</a>
           
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <img src="world.jpg" class="card-img-top" alt="..." width="150" height="230">
                    <div class="card-body">
                        <h5 class="card-title">Latest News & Updates</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="loggin.html" target = "_blank" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="diet.jpg" class="card-img-top" alt="..." width="150" height="230">
                    <div class="card-body">
                        <h5 class="card-title">Diet recommendation</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="mental-health.jpg" class="card-img-top" alt="..." width="150" height="230">
                    <div class="card-body">
                        <h5 class="card-title">Mental health</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
          
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error al recuperar los datos: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Frontend app listening at http://localhost:${port}`);
});