## Bridge from differential forms: local primitives as sheaf data

The sheaf axioms formalize a question already present in differential forms: if an object exists locally and agrees on overlaps, does it exist globally? For a closed 1-form $$\omega$$, the Poincare lemma gives local functions $$f_i$$ with $$df_i=\omega$$ on sufficiently small open sets. On overlaps,

$$
d(f_i-f_j)=0,
$$

so the differences $$f_i-f_j$$ are locally constant. The obstruction to choosing the $$f_i$$ so that they glue is the prototype for sheaf cohomology.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: exact form</span>

If $$\omega=df$$ globally, then each local primitive can be chosen as $$f_i=f|_{U_i}$$, and the overlap differences vanish. Gluing succeeds.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: punctured plane</span>

For the global angular form $$\alpha=(-y\,dx+x\,dy)/(x^2+y^2)$$ on $$\mathbb C^*$$, local angle functions $$\theta_i$$ satisfy $$d\theta_i=\alpha$$. After going once around the origin the angle changes by $$2\pi$$. The local data are valid; the global primitive is obstructed.
</div>
