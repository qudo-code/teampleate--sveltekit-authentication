{#if $page.data.user?.username}
    <h1 class="text-4xl"><strong>✅ Authorized</strong></h1>
    <p>You have successfully logged in.</p>
    
    <h2 class="text-2xl mt-5 font-bold">User</h2>

    <div class="border rounded-lg mb-4 p-2">
        {JSON.stringify($page.data.user, null, 4)}
    </div>

    <h2 class="text-2xl mt-5 font-bold">Token</h2>

    <div class="border rounded-lg mb-4 p-2 break-words">
        {$page.data.cookies.token}
    </div>
{:else}
    <h1 class="text-4xl"><strong>🚫 Unauthorized</strong></h1>
    <p>You need to sign in to view this page.</p>
{/if}

<h2 class="text-2xl font-bold mt-10">All Users</h2>
{#if users.length}
    {#each users as { username, bio }}
        <div class="border rounded-lg mb-4 p-2">
            <h2 class="text-xl font-bold">{username}</h2>
            <p>{bio}</p>
        </div>
    {/each}
{:else}
    <i class="opacity-50">Login to view users</i>
{/if}

<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let users = [];

    onMount(async () => {
        if($page.data.user?.username) {
            const response = await fetch("/api/users");

            const { data } = await response.json();

            users = data;
        }
    });

    $: console.log({ users });
</script>
