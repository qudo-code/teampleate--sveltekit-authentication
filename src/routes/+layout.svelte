<script>
    import "../app.postcss";

    import { page } from "$app/stores";

    const logout = async () => {
        try {
            await fetch("/api/user/logout");
    
            window.location.href = "/";
        } catch(error) {
            console.log(error);
        }
    };

</script>

<main class="flex justify-center">
    <div class="max-w-xl w-full py-10">
        <nav class="flex justify-between w-full">
            <div>
                <h1 class="text-4xl">
                    🔐
                </h1>
            </div>
            <div class="flex items-center">
                {#if !$page.data.user?.username}
                    <a
                        class="btn btn-outline mr-2"
                        class:btn-secondary={$page.url.pathname !== "/app/login"}
                        href="/app/login">
                        Login
                    </a>
                    <a
                        class="btn btn-outline mr-2"
                        class:btn-secondary={$page.url.pathname !== "/app/sign-up"}
                        href="/app/sign-up">
                        Sign up
                    </a>
                {/if}
                <a
                    class="btn btn-outline mr-2"
                    class:btn-secondary={$page.url.pathname !== "/"}
                    href="/">
                    <svg
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"
                            fill="white" /></svg>
                </a>

                {#if $page.data.user?.username}
                    <button
                        class="btn btn-warning"
                        on:click={logout}
                    >
                        Logout
                    </button>
                {/if}
            </div>
        </nav>
        <div class="py-5">
            <slot />
        </div>
    </div>
</main>

