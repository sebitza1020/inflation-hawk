package com.inflationhawk;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
public class PriceAlert extends PanacheEntity {

    public String userEmail;
    public String productName;
    public Double targetPrice;

    @CreationTimestamp
    public Instant createdAt;

    public boolean isActive = true;

    public PriceAlert() {}

    public PriceAlert(String userEmail, String productName, Double targetPrice) {
        this.userEmail = userEmail;
        this.productName = productName;
        this.targetPrice = targetPrice;
    }
}
