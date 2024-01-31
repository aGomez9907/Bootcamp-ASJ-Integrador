package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.PurchaseOrder;
import com.bootcamp.Integrador.models.PurchaseOrderDetail;
import com.bootcamp.Integrador.models.PurchaseOrderStatus;
import com.bootcamp.Integrador.repositories.PurchaseOrderDetailRepository;
import com.bootcamp.Integrador.repositories.PurchaseOrderStatusRepository;

import jakarta.transaction.Transactional;

@Service
public class PurchaseOrderStatusService {
	@Autowired
	PurchaseOrderStatusRepository purchaseOrderStatusRepository;

	public List<PurchaseOrderStatus> getPurchaseOrderStatuses() {
		return purchaseOrderStatusRepository.findAll();
	}

	public Optional<PurchaseOrderStatus> getPurchaseOrderStatusById(Integer id) {
		return purchaseOrderStatusRepository.findById(id);
	}

	@Transactional
	public PurchaseOrderStatus createPurchaseOrderStatus(PurchaseOrderStatus purchaseOrderStatus) {
		PurchaseOrderStatus resultPurchaseOrderStatus = purchaseOrderStatusRepository.save(purchaseOrderStatus);
		return resultPurchaseOrderStatus;
	}

	public String updatePurchaseOrderStatus(Integer id, PurchaseOrderStatus purchaseOrderStatus) {
		try {
			PurchaseOrderStatus purchase = purchaseOrderStatusRepository.findById(id).get();// obtengo la tarea original
			if (purchase != null) {
				purchase.setStatus(purchaseOrderStatus.getStatus());
				purchaseOrderStatusRepository.save(purchase);
				return "PurchaseOrderStatus with id: " + id + " updated successfully.";
			}
			return "Error: The purchaseOrderStatus is null.";

		} catch (Exception err) {
			return "Error: The purchaseOrderStatus couldn´t be found.";
		}

	}

	public PurchaseOrderStatus deletePurchaseOrderStatus(Integer id) {
		try {
			PurchaseOrderStatus purchase =  purchaseOrderStatusRepository.findById(id).get();
			purchase.setDeleted(true);
			purchaseOrderStatusRepository.save(purchase);
			return purchaseOrderStatusRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public PurchaseOrderStatus recoverPurchaseOrderStatus(Integer id) {
		try {
			PurchaseOrderStatus purchase =  purchaseOrderStatusRepository.findById(id).get();
			purchase.setDeleted(false);
			purchaseOrderStatusRepository.save(purchase);
			return purchaseOrderStatusRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}

}
