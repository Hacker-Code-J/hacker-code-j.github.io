## Calculus root: antiderivatives and path integrals

In one variable, if $$F'=f$$, then

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

Line integrals ask when the same endpoint principle survives after the input is allowed to move through a plane or a manifold. A 1-form $$\eta$$ is exact when $$\eta=df$$, and then every path integral satisfies

$$
\int_\gamma \eta=f(\gamma(b))-f(\gamma(a)).
$$

<div class="df-example" markdown="1">
<span class="df-env-title">Example: ordinary integral as a line integral</span>

On the real line, the 1-form $$x^2\,dx$$ has primitive $$x^3/3$$. Along the interval path $$\gamma(t)=t$$ from $$1$$ to $$3$$,

$$
\int_\gamma x^2\,dx=\int_1^3 x^2\,dx={26\over3}.
$$

This is the fundamental theorem for line integrals in dimension one.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: path dependence is the new phenomenon</span>

For $$\eta=-y\,dx+x\,dy$$, the path from $$(0,0)$$ to $$(1,1)$$ matters. Along the diagonal $$r(t)=(t,t)$$ the integral is $$0$$. Along the broken path $$(0,0)\to(1,0)\to(1,1)$$, the first segment contributes $$0$$ and the second contributes $$\int_0^1 1\,dy=1$$. The failure of endpoint-only behavior is exactly the failure of having a global potential.
</div>
