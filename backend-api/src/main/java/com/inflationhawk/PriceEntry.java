package com.inflationhawk;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;


@Entity
public class PriceEntry extends PanacheEntity {
    public String productName;
    public Double price;
    public String storeName;
    public String city;
    public String reportedBy;

    @CreationTimestamp
    public Instant createdAt;

    public Double latitude;
    public Double longitude;

    // Empty constructor necessary for JPA
    public PriceEntry() {}

    public PriceEntry(String productName, Double price, String storeName, String city, Instant createdAt) {
        this.productName = productName;
        this.price = price;
        this.storeName = storeName;
        this.city = city;
        this.createdAt = createdAt;
    }
}
