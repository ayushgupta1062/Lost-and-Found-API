package com.college.lostandfound.controller;

import com.college.lostandfound.model.Item;
import com.college.lostandfound.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class ItemController {

    @Autowired
    private ItemService itemService;

    // GET /api/items - Get all items
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // GET /api/items/{id} - Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    // POST /api/items - Create a new item
    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        Item createdItem = itemService.createItem(item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    // PUT /api/items/{id} - Update an existing item
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @Valid @RequestBody Item item) {
        Item updatedItem = itemService.updateItem(id, item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    // DELETE /api/items/{id} - Delete an item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // GET /api/items/status/{status} - Filter items by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Item>> getItemsByStatus(@PathVariable String status) {
        List<Item> items = itemService.getItemsByStatus(status);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // GET /api/items/search?name=keyword - Search items by name
    @GetMapping("/search")
    public ResponseEntity<List<Item>> searchItems(@RequestParam String name) {
        List<Item> items = itemService.searchItemsByName(name);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
