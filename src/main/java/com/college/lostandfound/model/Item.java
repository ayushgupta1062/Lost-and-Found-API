package com.college.lostandfound.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Item name is required")
    @Column(name = "item_name", nullable = false)
    private String itemName;

    @NotBlank(message = "Location is required")
    @Column(name = "location_found", nullable = false)
    private String locationFound;

    @NotNull(message = "Date found is required")
    @Column(name = "date_found", nullable = false)
    private LocalDate dateFound;

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status;

    // Default constructor (required by JPA)
    public Item() {
    }

    // Parameterized constructor
    public Item(String itemName, String locationFound, LocalDate dateFound, String status) {
        this.itemName = itemName;
        this.locationFound = locationFound;
        this.dateFound = dateFound;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getLocationFound() {
        return locationFound;
    }

    public void setLocationFound(String locationFound) {
        this.locationFound = locationFound;
    }

    public LocalDate getDateFound() {
        return dateFound;
    }

    public void setDateFound(LocalDate dateFound) {
        this.dateFound = dateFound;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", locationFound='" + locationFound + '\'' +
                ", dateFound=" + dateFound +
                ", status='" + status + '\'' +
                '}';
    }
}
