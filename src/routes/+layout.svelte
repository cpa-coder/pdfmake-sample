<script>
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster richColors />
<body class="h-screen w-full">
	<slot />
</body>
