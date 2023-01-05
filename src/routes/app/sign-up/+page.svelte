<script>
    const data = {
        password : "",
        username : "",
        bio      : "",
    };

    let signUpError = "";
    let userCreated = false;
    let isLoading = false;

    // eslint-disable-next-line max-statements
    const submit = async () => {
        signUpError = "";
        userCreated = false;
        isLoading = true;

        try {
            const response = await fetch("/api/user/create", {
                method : "POST",
                body   : JSON.stringify(data),
            });

            if(response.status === 501) {
                signUpError = "User already exists.";
                
                console.log(await response.text());
                
                return;
            } else if(response.status !== 200) {
                signUpError = "Failed to create user.";

                console.log(await response.text());
                
                return;
            }

            window.location.href = "/";
        } catch(error) {
            console.log(error);

            signUpError = "Failed to create account.";
        }

        isLoading = false;
    };

</script>

{#if signUpError}
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
            <span>Failed to create account. {signUpError}</span>
        </div>
        <div class="flex-none">
            <button
                class="btn btn-sm btn-primary"
                on:click={() => (signUpError = "")}>Close</button>
        </div>
    </div>
{/if}

<h1 class="text-3xl font-bold mb-4">Sign Up</h1>

<form
    action=""
    on:submit|preventDefault={submit}
>
    <input
        class="input"
        placeholder="Username"
        type="text"
        bind:value={data.username}>
    <input
        class="input"
        placeholder="Password"
        type="password"
        bind:value={data.password}>
    <textarea
        class="textarea"
        placeholder="Bio"
        bind:value={data.bio}></textarea>
    <button class="btn btn-info border-round mt-2">Create Account</button>
</form>
