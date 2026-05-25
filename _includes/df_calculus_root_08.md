## Calculus root: solving $$u''=f$$

The Hodge-Weyl theorem has a one-variable shadow. On a circle of length $$L$$, one may write the model equation with either sign convention:

$$
u''(x)=f(x)\qquad\text{or}\qquad -u''(x)=f(x).
$$

Either sign convention can have a periodic solution only if

$$
\int_0^L f(x)\,dx=0,
$$

because the integral of $$u''$$ over one period is zero. Constants are also invisible to the second derivative, so one fixes uniqueness by imposing $$\int_0^L u\,dx=0$$.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: compatible forcing</span>

For $$f(x)=\sin x$$ on $$[0,2\pi]$$ with periodic boundary conditions, $$\int_0^{2\pi}f\,dx=0$$, and $$u(x)=-\sin x$$ solves $$u''=f$$. With the nonnegative convention $$-u''=f$$, the solution is $$u(x)=\sin x$$.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: incompatible forcing</span>

For $$f(x)=1$$, the compatibility condition fails:

$$
\int_0^{2\pi}1\,dx=2\pi.
$$

No periodic function has second derivative equal to $$1$$, and no periodic function satisfies $$-u''=1$$ either. On a compact surface, the condition $$\int_M f\,\omega=0$$ is the same obstruction expressed through Stokes and the area form.
</div>
