<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Urban Odyssey</title>
    {{--
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"> --}}


    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        body {
            @apply bg-cover bg-fixed bg-center h-screen overflow-hidden;
        }
    </style>
</head>

    <body>
        <div id="register"></div>
    </body>

</html>