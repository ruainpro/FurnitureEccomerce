$(document).ready(function () {
    // Register Function
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        var fullName = $('#fullName').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            $('#message').html('<div class="alert alert-danger">Passwords do not match.</div>');
            return;
        }
        debugger;

        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username is already taken
        var userExists = users.some(function(user) {
            return user.username === username;
        });

        if (userExists) {
            $('#message').html('<div class="alert alert-danger">Username already exists. Please choose another.</div>');
            return;
        }

        // Add the new user
        users.push({ fullName: fullName, username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));

        $('#message').html('<div class="alert alert-success">Registration successful!</div>');

        debugger;
        // Clear the form
        $('#registerForm')[0].reset();
    });

    // Login
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
    
        var users = JSON.parse(localStorage.getItem('users')) || [];
    
        var user = users.find(function (user) {
            return user.username === username && user.password === password;
        });
    
        if (user) {
            // Store the logged-in user's information in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
    
            $('#message').html('<div class="alert alert-success">Login successful! Welcome, ' + user.fullName + '.</div>');
            
            // Redirect to main.html after a short delay
            setTimeout(function () {
                window.location.href = "../pages/main.html";
            }, 1000); // 1 second delay for user to see the success message
        } else {
            $('#message').html('<div class="alert alert-danger">Invalid username or password. Please try again.</div>');
        }
    
        // Clear the form fields
        $('#loginForm')[0].reset();

    });

});