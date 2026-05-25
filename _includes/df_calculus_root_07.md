## Calculus root: total turning

Curvature begins in plane-curve calculus. If a unit-speed plane curve has tangent angle $$\theta(s)$$, then its signed curvature is

$$
\kappa(s)=\theta'(s).
$$

Therefore

$$
\int \kappa\,ds=\Delta\theta,
$$

the total turning of the tangent. Gauss-Bonnet replaces the curve by a surface and replaces curvature times arclength by the 2-form $$K\,dA$$.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: circle</span>

A circle of radius $$R$$ has curvature $$1/R$$ and arclength $$2\pi R$$. Hence

$$
\int \kappa\,ds=2\pi.
$$

This is the one-dimensional ancestor of total curvature formulas.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: polygon angle defect</span>

For a convex polygon, curvature is concentrated at corners. The total turning is the sum of exterior angles, equal to $$2\pi$$. Gauss-Bonnet spreads this same accounting over a smooth surface, with curvature density $$K\,dA$$ and topological total $$2\pi\chi(M)$$.
</div>
