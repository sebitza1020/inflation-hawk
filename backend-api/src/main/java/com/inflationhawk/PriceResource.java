package com.inflationhawk;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;
import java.util.Map;

@Path("/prices")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PriceResource {

    @Inject
    JsonWebToken jwt;

    @GET
    public List<PriceEntry> getAllPrices() {
        return PriceEntry.list("order by createdAt DESC");
    }

    @POST
    @Authenticated
    @Transactional
    public Response addPrice(PriceEntry entry) {
        if (entry.price == null || entry.price <= 0) {
            return Response.status(400).entity("Prețul trebuie să fie pozitiv").build();
        }

        String userEmail = jwt.getClaim("email");

        System.out.println("Userul " + userEmail + " a adaugat un pret.");

        entry.reportedBy = jwt.getClaim("email");
        entry.persist();
        return Response.status(201).entity(entry).build();
    }

    // 3. Search after product (GET /prices/search?product=Milk)
    @GET
    @Path("/search")
    public List<PriceEntry> search(@QueryParam("product") String product) {
        if (product == null || product.isBlank()) {
            return List.of();
        }
        // Case-insensitive search (ignore upper/lowercase letters)
        return PriceEntry.list("LOWER(productName) LIKE ?1", "%" + product.toLowerCase() + "%");
    }

    // 4. Statistics for a product (GET /prices/stats?product=Milk)
    @GET
    @Path("/stats")
    public Response getStats(@QueryParam("product") String product) {
        // Select only the prices for respective product
        List<PriceEntry> entries = PriceEntry.list("productName", product);

        if (entries.isEmpty()) {
            return Response.status(404).entity("Produsul nu are istoric").build();
        }

        // Java Streams for fast calculation
        double average = entries.stream()
                .mapToDouble(e -> e.price)
                .average()
                .orElse(0.0);

        double min = entries.stream()
                .mapToDouble(e -> e.price)
                .min()
                .orElse(0.0);

        // We return a simple JSON object built instantly
        return Response.ok(
                Map.of(
                        "product", product,
                        "average_price", String.format("%.2f", average),
                        "min_price", min,
                        "data_points", entries.size()
                )
        ).build();
    }
}
