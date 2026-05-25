## First picture: closed forms modulo exact forms

Before sheaves enter, de Rham cohomology is a quotient of differential forms:

$$
H^k_{\mathrm{dR}}(X)=
{\ker(d:\mathcal A^k(X)\to\mathcal A^{k+1}(X))
\over
\operatorname{im}(d:\mathcal A^{k-1}(X)\to\mathcal A^k(X))}.
$$

The numerator consists of closed forms: forms with no local differential defect, so $$d\omega=0$$. The denominator consists of exact forms: forms that are globally derivatives, so $$\omega=d\eta$$. Since $$d^2=0$$, every exact form is closed. De Rham cohomology asks whether the converse holds globally.

On a small coordinate ball, the Poincare lemma says that every closed positive-degree form is exact; in degree zero, closed functions are locally constant. Therefore de Rham cohomology is not measuring local calculus. It is measuring global information: in positive degree, the failure of local primitives to glue; in degree zero, the locally constant choices on connected components.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: degree zero cohomology</span>

A 0-form is a smooth function. It is closed exactly when

$$
df=0.
$$

On each connected component this means $$f$$ is constant. Since there are no $$(-1)$$-forms, there are no exact 0-forms to quotient by. Thus

$$
H^0_{\mathrm{dR}}(X)\cong
\{\text{locally constant real functions on }X\}.
$$

For a connected manifold, $$H^0_{\mathrm{dR}}(X)\cong\mathbb R$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: punctured plane and winding</span>

On $$\mathbb C^*$$, write $$z=x+iy$$. The 1-form

$$
\alpha={-y\,dx+x\,dy\over x^2+y^2}
$$

is closed. Locally it is $$d\theta$$, the derivative of the polar angle. It is not globally exact, because

$$
\int_{|z|=1}\alpha=2\pi.
$$

If $$\alpha=df$$ globally, Stokes or the fundamental theorem for line integrals would force every integral over a closed loop to vanish. The nonzero period records the hole in $$\mathbb C^*$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: area on a closed surface</span>

Let $$X$$ be a compact oriented surface with area form $$\omega$$. Since $$\omega$$ is top degree, $$d\omega=0$$ automatically. But $$\omega$$ is not exact if

$$
\int_X\omega\ne0,
$$

because an exact top-degree form $$d\eta$$ integrates to $$\int_{\partial X}\eta=0$$ on a closed surface. Thus $$H^2_{\mathrm{dR}}(X)$$ detects the fundamental class.
</div>

This quotient viewpoint is the concrete side of the theorem below. The sheaf-theoretic side explains why this quotient computes $$H^k(X,\underline{\mathbb R})$$, the cohomology of the constant sheaf.
