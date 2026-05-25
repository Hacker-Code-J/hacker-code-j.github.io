## Calculus root: the differential in one variable

In one-variable calculus the expression

$$
df=f'(x)\,dx
$$

already separates two roles. The number $$f'(x)$$ is the rate of change, while $$dx$$ is the infinitesimal input direction. Evaluating $$df$$ on a velocity $$v\,\partial_x$$ gives

$$
df_x(v\,\partial_x)=f'(x)v,
$$

which is exactly the directional rate observed along a parametrized curve $$x(t)$$ with $$x'(0)=v$$. The cotangent vector $$df_x$$ is therefore the device that eats tangent vectors and returns first-order change.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: ordinary chain rule</span>

If $$f(x)=x^3$$ and $$x(t)=2+t^2$$, then

$$
{d\over dt}f(x(t))=df_{x(t)}(x'(t)\partial_x)
=3x(t)^2x'(t).
$$

The formula for a 1-form on a manifold is this calculation with several coordinate directions available.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: two coordinates branch from the same rule</span>

For $$f(x,y)=x^2y$$,

$$
df=2xy\,dx+x^2\,dy.
$$

On a curve $$r(t)=(x(t),y(t))$$,

$$
df(r'(t))=2xy\,x'(t)+x^2y'(t),
$$

the ordinary derivative of $$f(r(t))$$. Tangent and cotangent language is the coordinate-free packaging of this single-variable chain rule.
</div>
