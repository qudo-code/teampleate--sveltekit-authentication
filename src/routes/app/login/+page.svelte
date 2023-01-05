<script>
    let loginError = "";
    let isLoading = false;

    const data = {
        username : "",
        password : "",
    };

    const submit = async () => {
        loginError = "";
        isLoading = true;

        try {
            const response = await fetch("/api/user/login", {
                method : "POST",
                body   : JSON.stringify(data),
            });

            if(response.status === 501) {
                loginError = "Invalid credentials.";
                isLoading = false;
                                
                return;
            } else if(response.status !== 200) {
                loginError = "Failed to login.";
                isLoading = false;

                console.log(await response.text());
                
                return;
            }

            window.location.href = "/";
        } catch(error) {
            console.log(error);
        }

        isLoading = false;
    };

</script>

{#if loginError}
    <div class="alert border border-neutral mb-3">
        <div>
            <svg
                class="stroke-warning flex-shrink-0 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"><path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"></path></svg>
            <span>Failed to login. {loginError}</span>
        </div>
        <div class="flex-none">
            <button
                class="btn btn-sm btn-primary"
                on:click={() => (loginError = "")}>Close</button>
        </div>
    </div>
{/if}

<h1 class="text-3xl font-bold mb-4">Login</h1>

<form
    action=""
    on:submit|preventDefault={submit}
>
    <input
        class="input input-bordered rounded w-full mb-3"
        placeholder="Username"
        type="text"
        bind:value={data.username}>
    <input
        class="input input-bordered rounded w-full mb-3"
        placeholder="Password"
        type="password"
        bind:value={data.password}>
    <button
        class="btn btn-accent border-round mt-2"
        class:loading={isLoading}>Login</button>
</form>

