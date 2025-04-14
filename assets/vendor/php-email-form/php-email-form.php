<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $toEmail = "villagegangwa@gmail.com"; // Replace with your email address
    $subject = "Contact Form Submission";

    // Sanitize user input to prevent security issues
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Check if all required fields are filled
    if (!empty($name) && !empty($email) && !empty($message)) {
        $headers = "From: $name <$email>";
        $mailBody = "Name: $name\nEmail: $email\nMessage: $message";

        // Send the email
        if (mail($toEmail, $subject, $mailBody, $headers)) {
            echo "Message sent successfully! We will get back to you as soon as possible.";
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    } else {
        echo "All fields are required.";
    }
}
?>
