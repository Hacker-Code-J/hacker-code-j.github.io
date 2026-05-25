## Calculus root: the fundamental theorem with boundary terms

Stokes' theorem is the fundamental theorem of calculus after the word "endpoint" is replaced by "boundary":

$$
\int_{[a,b]}df=f(b)-f(a)=\int_{\partial[a,b]}f.
$$

In higher dimensions, adjacent boundary pieces cancel with opposite orientations. What remains is the outer boundary, and the derivative becomes the exterior derivative.

<div class="df-example" markdown="1">
<span class="df-env-title">Example: rectangle cancellation</span>

Partition a rectangle into two smaller rectangles. The shared edge appears once with upward orientation and once with downward orientation, so the line integrals on that edge cancel. Green's theorem is the limiting form of this cancellation.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example: integration by parts as Stokes</span>

For functions $$u,v$$ on $$[a,b]$$,

$$
d(uv)=u\,dv+v\,du.
$$

Integrating gives

$$
\int_a^b u\,v'\,dx=[uv]_a^b-\int_a^b v\,u'\,dx.
$$

The boundary term in integration by parts is the one-dimensional prototype of every Stokes boundary term.
</div>
