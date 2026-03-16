package com.college.lostandfound.repository;

import com.college.lostandfound.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // Find items by status (e.g., "FOUND", "CLAIMED", "UNCLAIMED")
    List<Item> findByStatus(String status);

    // Search items by name (case-insensitive, partial match)
    List<Item> findByItemNameContainingIgnoreCase(String itemName);

    // Find items by location
    List<Item> findByLocationFoundContainingIgnoreCase(String location);
}
