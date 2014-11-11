/* ------------------------------------------
 * Warshall-Floyd
 *
 * works on O(V^3)
 *
 * V is the number of vertexes
 *
 * d[i][j] is the cost of (i -> j)
 * INF means no edge
 *
 */

#define MAX_V 1000

int V;
int d[MAX_V][MAX_V];

void wall() {
  rep(i, V) d[i][i] = 0;
  rep(k, V) rep(i, V) rep(j, V)
    d[i][j] = min(d[i][j], d[i][k] + d[j][k]);
}
