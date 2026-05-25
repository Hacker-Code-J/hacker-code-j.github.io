## Bridge from Stokes: obstruction propagation

Stokes' theorem explains how an interior derivative produces a boundary term. A long exact sequence explains how a local lifting problem produces a cohomology obstruction one degree higher. In both cases, the point is not the formal symbol but the bookkeeping of what remains after local cancellations.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: integration by parts</span>

The formula

$$
\int_a^b u\,v'\,dx=[uv]_a^b-\int_a^b v\,u'\,dx
$$

moves a derivative and creates a boundary term. The connecting homomorphism in a long exact sequence moves a lifting problem and creates an obstruction class.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: local lifts</span>

If a section of $$\mathcal F''$$ lifts locally to $$\mathcal F$$, the differences of those local lifts on overlaps land in $$\mathcal F'$$. Their Cech class is the boundary term of the lifting problem.
</div>
