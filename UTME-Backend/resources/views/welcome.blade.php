<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Post UTME Backend</title>
    @vite(["resources/css/app.css", "resources/js/app.js"])
     {{-- Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass --}}
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center font-sans antialiased">

    <main class="text-center p-8 max-w-lg mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6 border border-indigo-500/20">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            System Online
        </div>

        <!-- Heading -->
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Welcome to <br>
            <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Post UTME Backend
            </span>
        </h1>

        <!-- Subtext -->
        <p class="text-slate-400 text-base sm:text-lg mb-8">
            Administrative dashboard and API services management portal.
        </p>

        <!-- Status Indicator / Action -->
        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Environment: <strong class="text-emerald-400">Ready</strong></span>
            <span>Laravel v 4.00922 UTME</span>
        </div>
    </main>

</body>
</html>