## Calculus root: substitution and signed area

The wedge product begins with the substitution rule. In one variable,

$$
\int_a^b f(x)\,dx=\int_{\phi^{-1}(a)}^{\phi^{-1}(b)} f(\phi(u))\phi'(u)\,du.
$$

The derivative $$\phi'(u)$$ measures signed stretching. In two variables, signed stretching is no longer one number from one derivative; it is the determinant

$$
\det{\partial(x,y)\over\partial(u,v)}.
$$

The form identity

$$
dx\wedge dy=
\det{\partial(x,y)\over\partial(u,v)}\,du\wedge dv
$$

is the substitution rule written before integration.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: orientation reversal</span>

The change $$x=u,\ y=-v$$ gives

$$
dx\wedge dy=du\wedge(-dv)=-du\wedge dv.
$$

The negative sign is the same sign one sees when reversing the limits of a one-variable integral.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: polar coordinates</span>

For $$x=r\cos\theta,\ y=r\sin\theta$$,

$$
dx\wedge dy=r\,dr\wedge d\theta.
$$

The factor $$r$$ is the familiar polar Jacobian. The wedge product remembers both area scaling and orientation.
</div>
