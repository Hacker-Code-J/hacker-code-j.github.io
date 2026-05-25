## Calculus root: derivative, boundary, and mixed partials

The exterior derivative extends the one-variable derivative. For a function on the line,

$$
d(f)=f'(x)\,dx.
$$

The fundamental theorem of calculus then says

$$
\int_{[a,b]}df=f(b)-f(a)=\int_{\partial[a,b]}f.
$$

Exterior differentiation is designed so the same boundary principle remains true in every dimension.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: curl from failure of a 1-form to be a derivative</span>

For $$\eta=P\,dx+Q\,dy$$,

$$
d\eta=(Q_x-P_y)\,dx\wedge dy.
$$

If $$\eta=df$$, then $$P=f_x$$ and $$Q=f_y$$, so $$Q_x-P_y=f_{yx}-f_{xy}=0$$. The identity $$d^2=0$$ is the equality of mixed partials in invariant form.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: divergence from the same operation</span>

In $$\mathbb R^3$$, associate $$F=(P,Q,R)$$ to

$$
\alpha=P\,dy\wedge dz+Q\,dz\wedge dx+R\,dx\wedge dy.
$$

Then

$$
d\alpha=(P_x+Q_y+R_z)\,dx\wedge dy\wedge dz.
$$

Gradient, curl, and divergence are not separate miracles; they are different degrees of one derivative.
</div>
