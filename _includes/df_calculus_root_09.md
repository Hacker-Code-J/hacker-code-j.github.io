## Calculus root: every pitfall is already visible in first-year calculus

The common mistakes in differential forms are higher-dimensional versions of familiar calculus mistakes: dropping the sign when reversing limits, forgetting a Jacobian in substitution, confusing a derivative with an antiderivative, or ignoring a boundary term.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: sign from reversed limits</span>

In one variable,

$$
\int_b^a f(x)\,dx=-\int_a^b f(x)\,dx.
$$

The identity $$dy\wedge dx=-dx\wedge dy$$ is the same orientation sign in two variables.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: missing Jacobian</span>

The polar-coordinate mistake

$$
dx\,dy=dr\,d\theta
$$

is corrected by the form identity

$$
dx\wedge dy=r\,dr\wedge d\theta.
$$

The wedge product forces the substitution factor to appear before the integral is evaluated.
</div>
