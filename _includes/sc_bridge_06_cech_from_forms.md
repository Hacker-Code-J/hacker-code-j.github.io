## Bridge from forms: Cech cocycles are failed gluing records

The de Rham example of a closed non-exact form already contains a Cech 1-cocycle. Choose local primitives $$f_i$$ for a closed 1-form $$\omega$$ on a cover with connected overlaps. On overlaps, the locally constant differences

$$
c_{ij}=f_j-f_i
$$

satisfy $$c_{ij}+c_{jk}+c_{ki}=0$$ on triple overlaps. Changing the primitives changes $$c_{ij}$$ by a coboundary. Thus the Cech class records exactly the failure of local primitives to glue.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: the circle</span>

On $$S^1$$, local angle coordinates glue up to integer multiples of $$2\pi$$. Those locally constant jumps form a nontrivial Cech class, the same class detected by integrating the invariant angular form, usually written $$d\theta$$, around the circle.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example: exact forms give coboundaries</span>

If $$\omega=df$$ globally, take $$f_i=f|_{U_i}$$. Then $$c_{ij}=0$$. If different local primitives are chosen, the resulting cocycle is a coboundary, so its cohomology class still vanishes.
</div>
