<script>
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	async function download() {
		try {
			var res = await fetch('/api/pdf/fda58994a40541068772bd5c495d7f3cs');
			console.log('has result');
			if (!res.ok) {
				toast.error('Invalid url');
				return;
			}

			var blob = await res.blob();

			if (blob.size === 0) {
				return;
			}

			const _url = window.URL.createObjectURL(blob);
			window.open(_url, '_blank');
		} catch (error) {
			console.log('error url');
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button on:click={download}>Print PDF</Button>
