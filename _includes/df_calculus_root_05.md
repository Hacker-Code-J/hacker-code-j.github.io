## Calculus root: complex notation for two real line integrals

A complex line integral is still a line integral. If $$z=x+iy$$ and $$f=u+iv$$, then

$$
f(z)\,dz=(u\,dx-v\,dy)+i(v\,dx+u\,dy).
$$

Thus one complex integral packages two real 1-form integrals. The new power of the notation is that holomorphicity imposes the Cauchy-Riemann equations, which turn those two real forms into closed forms.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: the integral of $$z\,dz$$</span>

Since

$$
z\,dz=d\left({z^2\over2}\right),
$$

its integral around every closed contour is zero. This is the complex version of integrating an exact 1-form.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: $$dz/z$$ and the missing primitive</span>

On a small simply connected sector of $$\mathbb C^*$$,

$$
{dz\over z}=d\log z.
$$

Around the unit circle, however,

$$
\int_{|z|=1}{dz\over z}=2\pi i.
$$

The local primitive exists, but it does not glue globally. This is the same obstruction that later appears in sheaf cohomology through local logarithms.
</div>
