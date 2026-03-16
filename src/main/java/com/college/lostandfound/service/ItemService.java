package com.college.lostandfound.service;

import com.college.lostandfound.model.Item;
import com.college.lostandfound.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    // Get all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Get item by ID
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    // Create a new item
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    // Update an existing item
    public Item updateItem(Long id, Item itemDetails) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        item.setItemName(itemDetails.getItemName());
        item.setLocationFound(itemDetails.getLocationFound());
        item.setDateFound(itemDetails.getDateFound());
        item.setStatus(itemDetails.getStatus());

        return itemRepository.save(item);
    }

    // Delete an item
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        itemRepository.delete(item);
    }

    // Get items by status
    public List<Item> getItemsByStatus(String status) {
        return itemRepository.findByStatus(status);
    }

    // Search items by name
    public List<Item> searchItemsByName(String name) {
        return itemRepository.findByItemNameContainingIgnoreCase(name);
    }
}
